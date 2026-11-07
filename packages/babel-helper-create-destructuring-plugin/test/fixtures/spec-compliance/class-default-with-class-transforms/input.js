const { C = class { static before = this.name; }, D = class { static before = this.name; static name = "custom"; } } = {};
