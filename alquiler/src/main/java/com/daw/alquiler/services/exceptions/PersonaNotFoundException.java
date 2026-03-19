package com.daw.alquiler.services.exceptions;

public class PersonaNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1143103889299441702L;
	public PersonaNotFoundException(String message) {
		super(message);
	}

}
