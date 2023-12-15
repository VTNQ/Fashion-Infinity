<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class reset extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $token;
    public $otp;
       

    /**
     * Create a new message instance.
     */
  
    public function __construct($name,$token,$otp)
    {
        //
        $this->name = $name;
        $this->token = $token;
        $this->otp=$otp;
     
    }
    

    public function build()
    {
        $user['name'] = $this->name;
        $user['token'] = $this->token;
        $user['otp']=$this->otp;
        return $this->from("yoursenderemail@mail.com", "Sender Name")
        ->subject('Password Reset Link')
        ->view('Account.otp', ['user' => $user]);
    }
}
