const MainContent = class MainContent {
    constructor(api) {
      this.currentStep = null
      this.api = api
    }
    init() {}
    getData() {
      return fetch(this.api + '/json.php')
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          return data;
      })
      .catch(e => {
        return [];
      });
    }
    sendFormData(formData) {
      return fetch(this.api + `/stones.php`, {
        body: formData,
        method: 'POST',
      })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          return data;
      })
      .catch(e => {
        return [];
      });
    }
    sendStone(formData) {
      for(var pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]);
      }
      return fetch(this.api + `/addstones.php`, {
        body: formData,
        method: 'POST',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return {...data, hasError: false};
      })
      .catch(e => {
        console.log('sendStone', e)
        return {error: e, hasError: true};
      });
    }
}

export default MainContent;