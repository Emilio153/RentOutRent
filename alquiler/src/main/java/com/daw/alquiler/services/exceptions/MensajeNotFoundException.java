package com.daw.alquiler.services.exceptions;

public class MensajeNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -9161035937146694142L;
	
	public MensajeNotFoundException(String message) {
		super(message);
	}

}
