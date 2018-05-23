const getState = () => ({});

const { data: { courses: oldCourses = [] } = {} } = getState();

expect(oldCourses).toEqual([]);
