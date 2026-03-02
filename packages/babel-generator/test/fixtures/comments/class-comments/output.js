const A = class /* before body */{/* inside body */};
const B = class /* before name */X /* before body */ {/* inside body */};
const C = class /* before extends */ extends /* after extends */X /* before body */ {/* inside body */};
const D = class /* before name */X /* before extends */ extends /* after extends */X /* before body */ {/* inside body */};

class /* before name */E /* before body */ {/* inside body */}
class /* before name */F /* before extends */ extends /* after extends */X /* before body */ {/* inside body */}
