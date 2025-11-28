// Roadmap related interfaces - matches exact schema design
export interface Roadmap {
  roadmap_id: number;
  roadmap_name: string;
  description: string;
  total_course: number;
  total_credit: number;
}

export interface CreateRoadmapRequest {
  roadmap_name: string;
  description: string;
  total_course?: number;
  total_credit?: number;
}

export interface UpdateRoadmapRequest {
  roadmap_name?: string;
  description?: string;
  total_course?: number;
  total_credit?: number;
}