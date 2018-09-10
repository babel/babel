function generateAsyncAction(type) {
  type = type.toUpperCase()
  const request = createAction(type+'_REQUEST',
      undefined, requestMetaCreator
  )
  request.request = request // crazy
  request.success = createAction(type+'_SUCCESS', undefined, metaCreator)
  request.error = createAction(type+'_ERROR', undefined, metaCreator)
  request.cancel = createAction(type+'_CANCEL', undefined, metaCreator)
  request.progress = createAction(type+'_PROGRESS', undefined, metaCreator)
  request.process = createAction(type+'_PROCESS', undefined, metaCreator)

  return request
}

class A extends B {
  constructor(timestamp) {
    super()
    this.timestamp = timestamp
    this.moment = moment(timestamp)
  }
}
