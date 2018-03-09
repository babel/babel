const getState = () => ({});

const { data: { courses: oldCourses = [] } = {} } = getState();

assert.deepEqual(oldCourses, []);
