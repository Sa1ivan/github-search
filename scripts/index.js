import { settings } from "./utils.js";
import Search from "./search.js";
const {
  selector,
  input,
  form,
  count,
  loading,
  result,
} = settings;
const search = new Search(
  selector,
  input,
  form,
  count,
  loading,
  result,
);
form.addEventListener("submit", search.onSubmit);
