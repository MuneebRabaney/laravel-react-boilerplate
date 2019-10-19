/**
 * @class Api
 *
 * @description Factory base for making API requests
 *
 * @author Muneeb Rabaney
 **/

class Api {
  static uri = 'http://price-check-test-server.local/api';
  static headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: 'http://localhost:3000',
  };

  /**
   * @method request
   *
   * @description Submit a request to an endpoint
   * @param endpoint String
   * @param data Object
   * @param options Object String
   * @return Object
   **/

  static async request(endpoint = null, { params = {} }) {
    const { length } = Object.keys(params);
    if (endpoint && length) {
      const { uri, headers } = this;
      endpoint = `${uri}/${endpoint}`;
      const response = await fetch(endpoint, { headers, ...params });
      const result = await response.json();
      return result;
    }
  }

  /**
   * @method post
   *
   * @description Performs a POST request
   * @param endpoint String
   * @param data Object
   * @return String
   **/
  static async post({ endpoint, data }) {
    const params = {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
    };
    try {
      const values = await this.request(endpoint, { params });
      if (values) return values;
    } catch (error) {
      console.log({
        error,
        type: 'error',
        message: `Failed to perform POST request`,
      });
    }
  }
}

export default Api;
