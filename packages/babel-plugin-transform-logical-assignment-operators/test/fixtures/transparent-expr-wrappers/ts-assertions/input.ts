(obj[++key] as number) ||= 1;
(obj[++key] satisfies number) ||= 1;
(<number>obj[++key]) ||= 1;
((obj[++key] as number)!) ||= 1;
(getObject() as any).x! ||= 1;
(x as number) ||= 1;
