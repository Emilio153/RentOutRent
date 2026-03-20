package com.daw.alquiler.services.exceptions;

public class UsernameNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7310830539140241807L;
	public UsernameNotFoundException(String message) {
		super(message);
	}

}
