const MainContent = class MainContent {
    constructor() {
      this.currentStep = null
    }
    chooseScreen(target) {
        if (!document.querySelector(`.content__in.isActive [data-target="${target}"]`).dataset.back) {
            console.log(`вперед к ${target}`);
            document.querySelector('.content__in.isActive').classList.add('isSlided');
        } else {
            console.log(`назад к ${target}`);
        }
        this.currentStep = target
        document.querySelector('.content__in.isActive').classList.remove('isActive');
        document.querySelector(`[data-screen="${target}"]`).classList.add('isActive')
        document.querySelector(`[data-screen="${target}"]`).classList.remove('isSlided')
    }
    init() {}
    getData() {
      return fetch('https://satepais.fvds.ru/local/ajax/json.php')
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          return data;
      })
      .catch(e => {
        console.log('getData', e)
        return {error: e};
      });
    }
    sendFormData(formData) {
      return fetch(`https://satepais.fvds.ru/local/ajax/stones.php`, {
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
        console.log('sendFormData', e)
        return {error: e};
      });
    }
    sendStone(formData) {
      for(var pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]);
      }
      return fetch(`https://satepais.fvds.ru/local/ajax/addstones.php`, {
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