export default {
  'POST /api/v1/upload-file': (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        fileId: 123,
        status: 'ok',
      });
    }, 3000);
  },
};
