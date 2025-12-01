import { FacultyService } from '../services/FacultyService';

export class FacultyController {
  private facultyService: FacultyService;

  constructor() {
    this.facultyService = new FacultyService();
  }

  /**
   * Get all faculties with pagination
   */
  async getFaculties(limit: number = 50, offset: number = 0) {
    try {
      const result = await this.facultyService.getAllFaculties(limit, offset);
      return {
        success: true,
        data: result.faculties,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch faculties'
      };
    }
  }

  /**
   * Get faculty by ID
   */
  async getFacultyById(faculty_id: number) {
    try {
      const faculty = await this.facultyService.getFacultyById(faculty_id);
      return {
        success: true,
        data: faculty
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Faculty not found'
      };
    }
  }

  /**
   * Get faculty with statistics
   */
  async getFacultyWithStatistics(faculty_id: number) {
    try {
      const faculty = await this.facultyService.getFacultyWithStatistics(faculty_id);
      return {
        success: true,
        data: faculty
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Faculty not found'
      };
    }
  }

  /**
   * Search faculties
   */
  async searchFaculties(searchTerm: string) {
    try {
      const faculties = await this.facultyService.searchFaculties(searchTerm);
      return {
        success: true,
        data: faculties
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search faculties'
      };
    }
  }

  /**
   * Create new faculty
   */
  async createFaculty(data: any) {
    try {
      const faculty = await this.facultyService.createFaculty(data);
      return {
        success: true,
        data: faculty,
        message: 'Faculty created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create faculty'
      };
    }
  }

  /**
   * Update faculty
   */
  async updateFaculty(faculty_id: number, data: any) {
    try {
      const faculty = await this.facultyService.updateFaculty(faculty_id, data);
      return {
        success: true,
        data: faculty,
        message: 'Faculty updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update faculty'
      };
    }
  }

  /**
   * Delete faculty
   */
  async deleteFaculty(faculty_id: number) {
    try {
      const result = await this.facultyService.deleteFaculty(faculty_id);
      return {
        success: true,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete faculty'
      };
    }
  }
}
