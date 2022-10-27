export default class Search {
  constructor(
    selector,
    input,
    form,
    count,
    loading,
    result,
  ) {
    this._selector = selector;
    this._input = input;
    this._form = form;
    this._count = count;
    this._loading = loading;
    this._result = result;
  }
  _getResponse = async () => {
    return await fetch(
      `https://api.nomoreparties.co/github-search?q=${this._input.value}`
    )
      .then((result) => result.json())
      .finally(this._form.reset());
  };

  _getCountResults = () => {
    this._count.innerHTML = `${this.response.items.length} repositories found for your request`;
    this._loading.style.display = "none";
    this._result.style.display = "flex";
  };

  _startSearch = () => {
    this._selector.innerHTML = "";
    this._loading.style.display = "grid";
    this._result.style.display = "none";
    this._count.innerHTML = "";
  };

  _render = (url, name) => {
    this._selector.innerHTML += `
        <div class="result-pages__container">
            <div class="result-pages__img"></div>
                <a href="${url}" class="result-pages__request" target="_blank">${name}</a>
        </div>
  `;
  };

  onSubmit = async (evt) => {
    evt.preventDefault();
    if (this._input.value.length > 0) {
      this._startSearch();
      this.response = await this._getResponse();
      this._getCountResults();
      this.response.items.forEach((item) => {
        this._render(item["html_url"], item["full_name"]);
      });
    }
  };
}
