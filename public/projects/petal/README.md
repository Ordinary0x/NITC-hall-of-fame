# petal

petal is a Go program that displays images directly in the terminal from either local files or web URLs.

It supports:

- `png` (also works with transparent png)
- `jpg` / `jpeg`
- `gif`

The image source can be local or remote, so you can point it at a file on disk or an image from the internet.

## How it works

The terminal renderer splits each text row into 2 rows of pixels using the `▄` character.
The top pixel is drawn with the background color, and the bottom pixel is drawn with the foreground color.

## How To Run

Run the program with a local path or a web URL:

```bash
go run . <image-path-or-url>
```

Example:

```bash
go run . https://forum.playhive.com/uploads/default/original/3X/9/f/9fbb4321b65bdf33a08df00b50a6e34c3d1e98df.gif
```

You can also build the binary first:

```bash
go build -o petal.exe
./petal.exe <image-path-or-url>
```

If you want to control the terminal size used for rendering, pass columns and rows. If you do not provide them, petal uses the current terminal size when it can:

```bash
go run . <image-path-or-url> <cols> <rows>
```

Example:

```bash
go run . examples/example3.png 80 24
```

## Supported Inputs

- Local image paths
- Remote image URLs
- GIF animation playback

## Notes

- Press `Ctrl+C` to stop a running GIF.
- If no dimensions are provided, the image is scaled to fit the terminal when possible.
