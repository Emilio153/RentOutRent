package com.daw.alquiler.services.exceptions;

public class MensajeException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -4172375545140011457L;

	public MensajeException(String mensaje) {
        super(mensaje);
    }
}