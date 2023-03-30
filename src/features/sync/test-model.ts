import { model, Model, prop, modelAction } from "mobx-keystone";

@model("test/TestModel")
export class TestModel extends Model({
  count: prop<number>(),
}) {
  @modelAction
  increment() {
    this.count += 1;
  }
}
