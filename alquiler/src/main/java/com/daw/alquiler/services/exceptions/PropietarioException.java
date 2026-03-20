package com.daw.alquiler.services.exceptions;

public class PropietarioException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 301238018035869512L;

	public PropietarioException(String mensaje) {
        super(mensaje);
    }
}