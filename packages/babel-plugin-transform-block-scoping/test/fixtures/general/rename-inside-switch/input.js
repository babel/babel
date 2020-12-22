window.test = () => {
    const e = "TEST";
    switch (e) {
        case "TEST":
            const e = [];
            e.push('111');
            alert(e);
            break;
        default: alert('666'); break;
    }
};

window.test = () => {
    const e = "TEST";
    switch (e) {
        case "TEST":
            const e = [];
            switch(e) {}
    }
};