var seattlers = [for (customers of countries) for (c of customers) if (c.city == "Seattle") { name: c.name, age: c.age }];
