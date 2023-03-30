import { Model, model, modelAction, prop } from "mobx-keystone";

@model("meta/EventLog")
export class EventLog extends Model({
  version: prop<number>(0),
  isReplaying: prop<boolean>(false).withSetter(),
}) {
  @modelAction
  bumpVersion() {
    this.version++;
  }
}
