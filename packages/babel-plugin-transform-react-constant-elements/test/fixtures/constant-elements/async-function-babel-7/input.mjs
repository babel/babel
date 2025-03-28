export default {
    async function(name) {
        const uppercasedName = name.upperCase();

        // awaits depending on uppercasedName go here

        return (<Foo name={uppercasedName} />);
    }
};
