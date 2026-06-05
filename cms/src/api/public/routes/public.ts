export default {
  routes: [
    {
      method: 'GET',
      path: '/public/site',
      handler: 'public.site',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/public/inquiry',
      handler: 'public.inquiry',
      config: {
        auth: false
      }
    }
  ]
}
