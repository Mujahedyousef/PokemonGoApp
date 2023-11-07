global.Logger = process.env.NODE_ENV === 'test' ? { info: () => {}, error: () => {} } : console;
