import { Router, Request, Response } from "express";
import { z } from "zod";
import { insertOrganizationSchema, insertGeneratedPolicySchema } from "@shared/schema";
import type { IStorage } from "./storage";

export function createRouter(storage: IStorage): Router {
  const router = Router();

  router.get("/api/organizations", async (req: Request, res: Response) => {
    try {
      const organizations = await storage.getOrganizations();
      res.json(organizations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organizations" });
    }
  });

  router.get("/api/organizations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid organization ID" });
      }
      
      const organization = await storage.getOrganization(id);
      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }
      
      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organization" });
    }
  });

  router.post("/api/organizations", async (req: Request, res: Response) => {
    try {
      const validated = insertOrganizationSchema.parse(req.body);
      const organization = await storage.createOrganization(validated);
      res.status(201).json(organization);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create organization" });
    }
  });

  router.get("/api/policy-sections", async (req: Request, res: Response) => {
    try {
      let sections = await storage.getPolicySections();
      
      const { accountingType, industry } = req.query;
      
      if (accountingType) {
        sections = sections.filter(section => {
          if (accountingType === "budget") {
            return section.budgetAccounting;
          } else if (accountingType === "accounting") {
            return section.businessAccounting;
          }
          return true;
        });
      }
      
      if (industry && typeof industry === "string") {
        sections = sections.filter(section => {
          if (!section.industrySpecific) {
            return true;
          }
          return section.industries?.includes(industry) || false;
        });
      }
      
      res.json(sections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch policy sections" });
    }
  });

  router.get("/api/generated-policies", async (req: Request, res: Response) => {
    try {
      const policies = await storage.getGeneratedPolicies();
      res.json(policies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch generated policies" });
    }
  });

  router.post("/api/generated-policies", async (req: Request, res: Response) => {
    try {
      const validated = insertGeneratedPolicySchema.parse(req.body);
      
      const organization = await storage.getOrganization(validated.organizationId);
      if (!organization) {
        return res.status(400).json({ error: "Organization not found" });
      }
      
      const allSections = await storage.getPolicySections();
      const validSectionIds = allSections.map(s => s.id);
      const invalidSections = validated.selectedSections.filter(
        id => !validSectionIds.includes(id)
      );
      
      if (invalidSections.length > 0) {
        return res.status(400).json({ 
          error: "Invalid policy section IDs", 
          invalidIds: invalidSections 
        });
      }
      
      const policy = await storage.createGeneratedPolicy(validated);
      res.status(201).json(policy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create generated policy" });
    }
  });

  router.get("/api/generated-policies/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid policy ID" });
      }
      
      const policy = await storage.getGeneratedPolicy(id);
      if (!policy) {
        return res.status(404).json({ error: "Generated policy not found" });
      }
      
      const organization = await storage.getOrganization(policy.organizationId);
      if (!organization) {
        return res.status(404).json({ error: "Associated organization not found" });
      }
      
      const allSections = await storage.getPolicySections();
      const selectedSections = allSections.filter(section => 
        policy.selectedSections.includes(section.id)
      );
      
      const response = {
        ...policy,
        organization,
        sections: selectedSections
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch generated policy" });
    }
  });

  return router;
}
