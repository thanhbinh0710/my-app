import { RoadmapRepository } from '../repositories/RoadmapRepository';
import { CreateRoadmapRequest, UpdateRoadmapRequest, Roadmap } from '../models/Roadmap';

export class RoadmapService {
  private roadmapRepository: RoadmapRepository;

  constructor() {
    this.roadmapRepository = new RoadmapRepository();
  }

  /**
   * Get all roadmaps with pagination
   */
  async getAllRoadmaps(limit: number = 50, offset: number = 0) {
    const roadmaps = await this.roadmapRepository.findAll(limit, offset);
    const total = await this.roadmapRepository.count();

    return {
      roadmaps,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get roadmap by ID
   */
  async getRoadmapById(roadmap_id: number) {
    const roadmap = await this.roadmapRepository.findById(roadmap_id);
    if (!roadmap) {
      throw new Error('Roadmap not found');
    }
    return roadmap;
  }

  /**
   * Get roadmap with all courses
   */
  async getRoadmapWithCourses(roadmap_id: number) {
    const data = await this.roadmapRepository.findWithCourses(roadmap_id);
    if (!data || data.length === 0) {
      throw new Error('Roadmap not found');
    }

    // Group courses by roadmap
    const firstRow: any = data[0];
    const roadmap = {
      roadmap_id: firstRow.roadmap_id,
      roadmap_name: firstRow.roadmap_name,
      description: firstRow.description,
      total_course: firstRow.total_course,
      total_credit: firstRow.total_credit,
      courses: data
        .filter((row: any) => row.course_id !== null)
        .map((row: any) => ({
          course_id: row.course_id,
          course_name: row.course_name,
          course_credit: row.course_credit,
          order: row.course_order
        }))
    };

    return roadmap;
  }

  /**
   * Search roadmaps by name
   */
  async searchRoadmaps(searchTerm: string) {
    return await this.roadmapRepository.searchByName(searchTerm);
  }

  /**
   * Create new roadmap
   */
  async createRoadmap(data: CreateRoadmapRequest) {
    try {
      return await this.roadmapRepository.create(data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create roadmap');
    }
  }

  /**
   * Update roadmap
   */
  async updateRoadmap(roadmap_id: number, data: UpdateRoadmapRequest) {
    try {
      return await this.roadmapRepository.update(roadmap_id, data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update roadmap');
    }
  }

  /**
   * Delete roadmap
   */
  async deleteRoadmap(roadmap_id: number) {
    try {
      await this.roadmapRepository.delete(roadmap_id);
      return { message: 'Roadmap deleted successfully' };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete roadmap');
    }
  }
}
