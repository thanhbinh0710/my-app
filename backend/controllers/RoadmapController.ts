import { RoadmapService } from '../services/RoadmapService';

export class RoadmapController {
  private roadmapService: RoadmapService;

  constructor() {
    this.roadmapService = new RoadmapService();
  }

  /**
   * Get all roadmaps with pagination
   */
  async getRoadmaps(limit: number = 50, offset: number = 0) {
    try {
      const result = await this.roadmapService.getAllRoadmaps(limit, offset);
      return {
        success: true,
        data: result.roadmaps,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch roadmaps'
      };
    }
  }

  /**
   * Get roadmap by ID
   */
  async getRoadmapById(roadmap_id: number) {
    try {
      const roadmap = await this.roadmapService.getRoadmapById(roadmap_id);
      return {
        success: true,
        data: roadmap
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Roadmap not found'
      };
    }
  }

  /**
   * Get roadmap with courses
   */
  async getRoadmapWithCourses(roadmap_id: number) {
    try {
      const roadmap = await this.roadmapService.getRoadmapWithCourses(roadmap_id);
      return {
        success: true,
        data: roadmap
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Roadmap not found'
      };
    }
  }

  /**
   * Search roadmaps
   */
  async searchRoadmaps(searchTerm: string) {
    try {
      const roadmaps = await this.roadmapService.searchRoadmaps(searchTerm);
      return {
        success: true,
        data: roadmaps
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search roadmaps'
      };
    }
  }

  /**
   * Create new roadmap
   */
  async createRoadmap(data: any) {
    try {
      const roadmap = await this.roadmapService.createRoadmap(data);
      return {
        success: true,
        data: roadmap,
        message: 'Roadmap created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create roadmap'
      };
    }
  }

  /**
   * Update roadmap
   */
  async updateRoadmap(roadmap_id: number, data: any) {
    try {
      const roadmap = await this.roadmapService.updateRoadmap(roadmap_id, data);
      return {
        success: true,
        data: roadmap,
        message: 'Roadmap updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update roadmap'
      };
    }
  }

  /**
   * Delete roadmap
   */
  async deleteRoadmap(roadmap_id: number) {
    try {
      const result = await this.roadmapService.deleteRoadmap(roadmap_id);
      return {
        success: true,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete roadmap'
      };
    }
  }
}
