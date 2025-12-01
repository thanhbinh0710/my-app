import { FacultyRepository } from '../repositories/FacultyRepository';
import { CreateFacultyRequest, UpdateFacultyRequest, Faculty } from '../models/Faculty';

export class FacultyService {
  private facultyRepository: FacultyRepository;

  constructor() {
    this.facultyRepository = new FacultyRepository();
  }

  /**
   * Get all faculties with pagination
   */
  async getAllFaculties(limit: number = 50, offset: number = 0) {
    const faculties = await this.facultyRepository.findAll(limit, offset);
    const total = await this.facultyRepository.count();

    return {
      faculties,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get faculty by ID
   */
  async getFacultyById(faculty_id: number) {
    const faculty = await this.facultyRepository.findById(faculty_id);
    if (!faculty) {
      throw new Error('Faculty not found');
    }
    return faculty;
  }

  /**
   * Get faculty with statistics (teacher count, student count, course count)
   */
  async getFacultyWithStatistics(faculty_id: number) {
    const faculty = await this.facultyRepository.findWithStatistics(faculty_id);
    if (!faculty) {
      throw new Error('Faculty not found');
    }
    return faculty;
  }

  /**
   * Search faculties by name
   */
  async searchFaculties(searchTerm: string) {
    return await this.facultyRepository.searchByName(searchTerm);
  }

  /**
   * Create new faculty
   */
  async createFaculty(data: CreateFacultyRequest) {
    try {
      return await this.facultyRepository.create(data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create faculty');
    }
  }

  /**
   * Update faculty
   */
  async updateFaculty(faculty_id: number, data: UpdateFacultyRequest) {
    try {
      return await this.facultyRepository.update(faculty_id, data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update faculty');
    }
  }

  /**
   * Delete faculty
   */
  async deleteFaculty(faculty_id: number) {
    try {
      await this.facultyRepository.delete(faculty_id);
      return { message: 'Faculty deleted successfully' };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete faculty');
    }
  }
}
