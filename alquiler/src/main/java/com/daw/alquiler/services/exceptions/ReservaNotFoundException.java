package com.daw.alquiler.services.exceptions;

public class ReservaNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5345341071351285435L;
	
    public ReservaNotFoundException(String message) {
		super(message);
    }
}
