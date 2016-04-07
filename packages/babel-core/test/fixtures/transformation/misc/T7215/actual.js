export default (onClick) => ({
    onClick: function(){
        onClick(text);
    },
});
