package com.daw.alquiler.services.exceptions;

public class ReservaException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 2287181832371421364L;

	public ReservaException(String mensaje) {
        super(mensaje);
    }
}
