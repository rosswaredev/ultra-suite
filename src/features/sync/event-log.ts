import { Model, model, modelAction, prop } from "mobx-keystone";

@model('meta/EventLog')
export class EventLog extends Model({
  version: prop<number>(0)
}) {
  @modelAction
  bumpVersion() {
    this.version++;
  }
}

export const eventLog = new EventLog({})