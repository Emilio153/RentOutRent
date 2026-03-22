package com.daw.alquiler.services.exceptions;

public class AuthException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8376771555771992505L;
	
	public AuthException(String message) {
		super(message);
	}

}
