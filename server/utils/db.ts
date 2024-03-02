// This is the file that holds the client that manages all database ops.
// Required due to the project's use of PostGIS extensions.

import { PrismaClient, type LibraryService } from "@prisma/client";

import type { Library } from "../../utils/types/library";

const prisma = new PrismaClient().$extends({
    model: {
        library: {
            async create(data: {
                name: string;
                suburb: string;
                latitude: number;
                longitude: number;
                libraryService: LibraryService;
            }) {
                const library: Library = {
                    name: data.name,
                    suburb: data.suburb,
                    location: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                    },
                    libraryService: data.libraryService,
                };

                const point = `POINT(${library.location.longitude} ${library.location.latitude})`;
                await prisma.$queryRaw`
                    INSERT INTO "Library" (name, suburb, location, "libraryServiceId") VALUES (${library.name}, ${library.suburb}, ST_GeomFromText(${point}, 4326), ${library.libraryService!.id})
                `;

                return library;
            },
            async findClosestPoints(latitude: number, longitude: number) {
                // Querying for closest points from the given latitude.
                const result = await prisma.$queryRaw<
                    // eslint-disable-next-line @typescript-eslint/array-type
                    {
                        id: string;
                        name: string;
                        suburb: string;
                        st_x: number | null;
                        st_y: number | null;
                    }[]
                >`SELECT id, name, suburb, ST_X(location::geometry), ST_Y(location::geometry) 
                  FROM "Library" 
                  ORDER BY ST_DistanceSphere(location::geometry, ST_MakePoint(${latitude}, ${longitude})) DESC`;
                const libraries: Library[] = result.map((data) => {
                    return {
                        id: data.id,
                        name: data.name,
                        suburb: data.suburb,
                        location: {
                            latitude: data.st_x || 0,
                            longitude: data.st_y || 0,
                        },
                    };
                });
                return libraries;
            },
        },
    },
});

export default prisma;
