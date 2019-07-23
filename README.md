# DISCLAIMER:

The current application is currently functional. The only issue is the output such as prediction and error values will be displayed in the command prompt/terminal.

## Running the application

Run angular application- `ng serve --open` <br>
Run the neural network- `npm run ml` <br>
Run both applications- `npm run start` <br>

## MLRecognitionApp

The application currently uses Angular for the front-end user interface and ExpressJS as the back-end stand-alone application. Tensorflow was the primary framework used to build the neural network.


## Checklist
- [x] Create foundation for both front and back end of the application.
- [x] Add a canvas to the angular webpage.
- [x] Create all the path for the request mappings.
- [x] Develop the neural network.
- [x] Create service for the angular webpage so a HTTP request can be done.
- [x] Process the image.
- [x] Convert into bitmap, then to a tensor.
- [x] Configure the neural network with proper back-propogation settings.
- [ ] Use MNIST dataset to train neural network.
- [ ] Display loss value.
- [ ] Add a progress bar to display epoch progression.
- [ ] Add more training data into the JSON file.
- [ ] Add a saving function to save the model.
- [ ] Display the prediction in the angular webpage.
- [ ] Finish about page.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
