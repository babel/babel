// Options: --unicode-escape-sequences
// Error: :4:5: The code point in a Unicode escape sequence cannot exceed 10FFFF

"\u{1000000}";
