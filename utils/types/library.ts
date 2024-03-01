import type { LibraryService } from "@prisma/client";

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Library {
    id?: string;
    name: string;
    suburb: string;
    location: Coordinate;
    libraryService?: LibraryService;
}
