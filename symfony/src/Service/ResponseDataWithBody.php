<?php

namespace App\Service;


class ResponseDataWithBody extends ResponseData
{
    public function __construct()
    {
        parent::__construct();
        $this->data['body'] = [];
    }

    public function setBody(array $body)
    {
        $this->data['body'] = $body;
    }
}
