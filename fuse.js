const { FuseBox, WebIndexPlugin, SVGPlugin, CSSPlugin, QuantumPlugin, JSONPlugin } = require("fuse-box");
const { src, context, task } = require("fuse-box/sparky");

context({
	isProduction: false,
	getConfig() {
		return FuseBox.init({
			homeDir : "./",
			output : "./dist/$name.js",
			useTypescriptCompiler : true,
			plugins: [
				CSSPlugin(),
				SVGPlugin(),
				WebIndexPlugin({
					template : "./src/index.html"
				}),
				JSONPlugin(),
				this.isProduction && QuantumPlugin({
					css : true,
					treeshake: true,
					uglify: true
				})
			]
		});
	},
	createAppBundle(fuse) {
		const app = fuse
			.bundle("app")
			.instructions(">[src/index.js]");

			if (!this.isProduction) {
				app.watch().hmr();
			}

		return app;
	},
	createVendorBundle(fuse) {
		const app = fuse
			.bundle("vendor")
			.instructions("~src/index.js");

		return app;
	}
})

task("clean", () => src("dist").clean("dist").exec() );

task("default", ["clean"], async (context) => {
	const fuse = context.getConfig();

	fuse.dev({port: 8080});
	context.createVendorBundle(fuse);
	context.createAppBundle(fuse);
	await fuse.run();
});

task("build", ["clean"], async (context) => {
	context.isProduction = true;
	const fuse = context.getConfig();

	context.createVendorBundle(fuse);
	context.createAppBundle(fuse);
	await fuse.run();
});