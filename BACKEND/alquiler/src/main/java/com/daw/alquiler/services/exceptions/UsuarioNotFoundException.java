package com.daw.alquiler.services.exceptions;

public class UsuarioNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1143103889299441702L;
	public UsuarioNotFoundException(String message) {
		super(message);
	}

}
