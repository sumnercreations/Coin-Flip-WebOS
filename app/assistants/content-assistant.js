function ContentAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

ContentAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
		// Create a Spinner
		this.controller.setupWidget("coinFlipSpinner", { spinnerSize : "small" }, { spinning: true } );
	
	/* add event handlers to listen to events from widgets */
		// bind the image to its handler
		this.imageTapHandler = this.handleImageTap.bind(this);
		// create listener for when image is tapped
	    this.controller.listen(this.controller.get("coin"), Mojo.Event.tap, this.imageTapHandler);
		
		this.updateCoin = this.updateCoin.bind(this);
		this.flipCoin = this.flipCoin.bind(this);		
};

ContentAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

ContentAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

ContentAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

ContentAssistant.prototype.handleImageTap = function(event) {
// recognizes the button press and flips the coin and update the display
	
	// Display scrim with spinner so user doesn't tap again while coin is being flipped
		$("coinFlipScrim").show();
	
	// Call the function to flip the coin
		this.flipCoin();
		
	// Hide the spinner now that the coin has been flipped
		$("coinFlipScrim").hide();	
	}

ContentAssistant.prototype.flipCoin = function(){
	// Create a random number from 0 to 1 and assign it to the variable randNum
		var randNum = Math.floor(Math.random()*2);
		
	// If randNum is 0 then set the coinsrc to heads.png and message text to Heads, otherwise set it to tails.png and message to Tails
		if(randNum == 1){
			coinsrc = "images/heads.png";
			message = "Heads";		
		}else{
			coinsrc = "images/tails.png";
			message = "Tails";
		};
	// Display the coinflip.gif for looks
		this.controller.get("coin").src = "images/coinflip.gif";
		
	// Update the src of the image tag
		this.controller.window.setTimeout(this.updateCoin(coinsrc, message).bind(this), 5000);
}
	
ContentAssistant.prototype.updateCoin = function (src, msg){
	// Update the src of the image tag
	this.controller.get("coin").src = src;
	
	// Notify the user that the coin was flipped
	this.controller.get("message").update(message);
}
