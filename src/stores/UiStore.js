import { decorate, observable } from "mobx";
class UiStore {
  isProgressBarShow = false;
  ProgressTitle = "";

  showProgressBar = (progressTitle = "In Progress") => {
    this.isProgressBarShow = true;
    this.ProgressTitle = progressTitle;
  };

  hideProgressBar = () => {
    this.isProgressBarShow = false;
  };
}

decorate(UiStore, {
  isProgressBarShow: observable,
  ProgressTitle:observable
});

export default new UiStore();
