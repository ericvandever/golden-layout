$(function () {
	var sconfig = {
		content: [{
			type: 'row',
			content: [
				{
					type: 'component',
					componentName: 'hey',
					componentState: {text: 'Component 1'}
				}
			]
		}]
	};
	var dconfig = {
		content: [{
			type: 'row',
			content: [
				{
					type: 'component',
					componentName: 'hey',
					componentState: {text: 'Component 1'}
				},
				{
					type: 'component',
					componentName: 'hey',
					componentState: {text: 'Component 2'}
				}
			]
		}]
	};
	var config = {
		content: [
			{
				type: 'row',
				content: [
					{
						width: 80,
						type: 'column',
						content: [
							{
								title: 'Fnts 100',
								type: 'component',
								componentName: 'hey',
							},
							{
								type: 'row',
								content: [
									{
										type: 'component',
										title: 'Golden',
										componentName: 'hey',
										width: 30,
										componentState: {bg: 'golden_layout_spiral.png'}
									},
									{
										title: 'Layout',
										type: 'component',
										componentName: 'hey',
										componentState: {bg: 'golden_layout_text.png'}
									}
								]
							},
							{
								type: 'stack',
								content: [
									{
										type: 'component',
										title: 'Acme, inc.',
										componentName: 'hey',
										componentState: {
											companyName: 'Stock X'
										}
									},
									{

										type: 'component',
										title: 'LexCorp plc.',
										componentName: 'hey',
										componentState: {
											companyName: 'Stock Y'
										}
									},
									{
										type: 'component',
										title: 'Springshield plc.',
										componentName: 'hey',
										componentState: {
											companyName: 'Stock Z'
										}
									}
								]
							}
						]
					},
					{
						width: 20,
						type: 'column',
						content: [
							{
								type: 'component',
								title: 'Performance',
								componentName: 'hey'
							},
							{
								height: 40,
								type: 'component',
								title: 'Market',
								componentName: 'hey'
							}
						]
					}
				]
			}
		]
	};

	window.myLayout = new GoldenLayout(dconfig);

	myLayout.registerComponent('hey', function (container, state) {
		if (state.bg) {
			container
				.getElement()
				.text('hey');
		}
	});

	myLayout.init();

	var addMenuItem = function (title, text) {
		var element = $('<li>' + text + '</li>');
		$('#menuContainer').append(element);

		var newItemConfig = {
			title: title,
			type: 'component',
			componentName: 'hey',
			componentState: {text: text}
		};

		element.click(() => {

			// up this to test memory usage with adding/removing
			// testing 8/8/2016
			// # of loops - javascript heap dump size
			// 0 - 6.9MB
			// 1 - 7.0MB
			// 5 - 7.1MB
			// 50 - 6.9MB
			// 500 - 7.0MB
			// delta appears to be mostly related to run time compiler optimization changes and tracking

			for (let j = 0; j < 1; j++) {
				for (let i = 0; i < 5; i++) {
					myLayout.root.contentItems[0].addChild(newItemConfig);
				}
				let arr = myLayout.root.contentItems[0].contentItems;
				for (let i = arr.length - 1; i > 0; i--) {
					// uncomment to do memory tests
					// arr[i].remove();
				}
				console.log('cycle');
			}

			setTimeout(() => {
				myLayout.root.contentItems[0].remove();
				myLayout.destroy();
				// afterwards check Detached Dom elements
				// various actions result in using different code paths and other potential saved DOM
				// references
			}, 2000);
		});
	};

	addMenuItem('Add me!', 'You\'ve added me!');

});
