const res = await request<BaseResponse<{ resultData: { code: number; output: unknown } }>>({
  url: 'abc',
  method: 'post'
})
