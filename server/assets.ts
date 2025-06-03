"use server";

import { Asset } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import assetSchema from "@/schemas/zod/asset-schema";
import { ServerResponse } from "@/types/response";
import { headers } from "next/headers";
import { z } from "zod";

export async function createAsset(
  data: z.infer<typeof assetSchema>
): Promise<ServerResponse<Asset>> {
  try {
    const parsed = assetSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: null,
        error: {
          status: "fail",
          statusCode: 422,
          message: "Datos inválidos",
          details: parsed.error.flatten(), // devuelve los errores de forma clara
        },
      };
    }

    const values = parsed.data;

    const requestHeaders = await headers();
    const organization = await auth.api.getFullOrganization({
      headers: requestHeaders,
    });

    if (!organization?.id) {
      return {
        success: null,
        error: {
          status: "error",
          statusCode: 400,
          message: "No hay una organización activa",
        },
      };
    }

    const existingAsset = await prisma.asset.findFirst({
      where: {
        assetName: values.assetName,
        organizationId: organization.id,
      },
    });

    if (existingAsset) {
      return {
        success: null,
        error: {
          status: "fail",
          statusCode: 409,
          message: `Ya existe un asset con el nombre "${values.assetName}" en esta organización.`,
        },
      };
    }

    const newAsset = await prisma.asset.create({
      data: {
        assetName: values.assetName,
        assetType: values.assetType,
        state: values.state,
        description: values.description,
        warrantyEndDate: values.warrantyEndDate,
        dnsName: values.dnsName,
        domain: values.domain,
        fqdn: values.fqdn,
        ipAddress: values.ipAddress,
        macAddress: values.macAddress,
        systemSKU: values.systemSKU,
        manufacturer: values.manufacturer,
        model: values.model,
        serialNumber: values.serialNumber,
        Organization: {
          connect: {
            id: organization.id,
          },
        },
      },
    });

    return {
      error: null,
      success: {
        content: newAsset,
        total: 1,
      },
    };
  } catch (err) {
    return {
      success: null,
      error: {
        statusCode: 500,
        message: "Error al crear un nuevo asset",
        status: "error",
        details: err,
      },
    };
  }
}

export async function getAllAssets(
  slug: string
): Promise<ServerResponse<Asset[]>> {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        slug,
      },
    });

    if (!organization?.id) {
      return {
        success: null,
        error: {
          status: "error",
          statusCode: 400,
          message: "No hay una organización activa",
        },
      };
    }

    const assets = await prisma.asset.findMany({
      where: {
        organizationId: organization.id,
      },
      orderBy: {
        assetName: "asc",
      },
    });
    return {
      success: {
        content: assets,
        total: assets.length,
      },
      error: null,
    };
  } catch (err) {
    return {
      error: {
        status: "error",
        statusCode: 500,
        message: "Error al recuperar los assets de la organización",
        details: err,
      },
      success: null,
    };
  }
}
