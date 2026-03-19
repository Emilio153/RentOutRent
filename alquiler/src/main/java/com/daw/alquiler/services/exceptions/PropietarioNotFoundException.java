package com.daw.alquiler.services.exceptions;

public class PropietarioNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4366142184267133895L;
	
	public PropietarioNotFoundException(String mensaje) {
        super(mensaje);
    }

}
