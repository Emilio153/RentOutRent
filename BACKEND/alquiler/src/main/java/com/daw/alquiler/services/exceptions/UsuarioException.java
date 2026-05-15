package com.daw.alquiler.services.exceptions;

public class UsuarioException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -8390823294643695168L;

	public UsuarioException(String mensaje) {
        super(mensaje);
    }
}