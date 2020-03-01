import axios from 'axios';

const CONTENT_PATH = 'locationweb';
const COURSE_API_URL = 'http://localhost:8080';
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${CONTENT_PATH}`;

class DataService {
  createLocation() {
    return axios.post(`${INSTRUCTOR_API_URL}/saveLoc`);
  }
}

export default new DataService();
