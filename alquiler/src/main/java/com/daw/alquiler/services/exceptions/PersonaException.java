package com.daw.alquiler.services.exceptions;

public class PersonaException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -8390823294643695168L;

	public PersonaException(String mensaje) {
        super(mensaje);
    }
}